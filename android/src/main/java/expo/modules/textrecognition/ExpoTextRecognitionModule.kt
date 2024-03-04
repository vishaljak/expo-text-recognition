package expo.modules.textrecognition

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

import android.util.Base64
import android.graphics.BitmapFactory
import android.graphics.Bitmap

import com.google.mlkit.vision.text.Text  
import com.google.mlkit.vision.text.TextRecognizer
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.TextRecognizerOptionsInterface
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import com.google.mlkit.vision.common.InputImage

import kotlinx.coroutines.tasks.await
import kotlinx.coroutines.runBlocking

import java.io.File

class ExpoTextRecognitionModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoTextRecognition")

    AsyncFunction("getText") { value: String, isBase64: Boolean ->
      runBlocking {
        performTextRecognition(value, isBase64)
      }
    }
  }

  private fun decodeBase64ToBitmap(base64: String): Bitmap {
    val bytes = Base64.decode(base64, 0)
    return BitmapFactory.decodeByteArray(bytes, 0, bytes.size)
  }

  private fun decodeFilePathToBitmap(filePath: String): Bitmap {
    val actualPath = if (filePath.startsWith("file://")) {
      filePath.substring(7)
    } else {
      filePath
    } 

    return BitmapFactory.decodeFile(actualPath)
  } 

  private suspend fun performTextRecognition(value: String, isBase64: Boolean): MutableList<String> {
    val recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)
    val image = if (isBase64) {
      InputImage.fromBitmap(decodeBase64ToBitmap(value), 0)
    } else {
      InputImage.fromBitmap(decodeFilePathToBitmap(value), 0)
    }

    var recognizedText = mutableListOf<String>()

    try {
      val text = recognizer.process(image).await()
      for (block in text.textBlocks) {
        for (line in block.lines) {
          recognizedText.add(line.text)
        }
      }
    } catch (e: Exception) {
      throw e
    }

    return recognizedText
  }
}
