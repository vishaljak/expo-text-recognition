import ExpoModulesCore
import Vision
import UIKit

public class ExpoTextRecognitionModule: Module {

  private let textRecognitionRequest = VNRecognizeTextRequest { (result, error) in 
    // recognized text is available here
  }

  enum TextRecognitionError: Error {
    case InvalidBase64Exception
    case TextRecognitionFailureException
    case InvalidPathException
  }

  public func definition() -> ModuleDefinition {
    Name("ExpoTextRecognition")

    AsyncFunction("getText") { (inputString: String, isBase64: Bool) -> [String]? in 
      let ciImage: CIImage

      if isBase64 {
        guard let imageData = Data(base64Encoded: inputString),
              let uiImage = UIImage(data: imageData),
              let ciImageFromBase64 = CIImage(image: uiImage) else {
          throw TextRecognitionError.InvalidBase64Exception
        }

        ciImage = ciImageFromBase64
      } else {
        var filePath = inputString

        if filePath.hasPrefix("file://") {
          filePath = (URL(string: filePath)?.path) ?? ""
        }

        guard let uiImage = UIImage(contentsOfFile: filePath),
              let ciImageFromPath = CIImage(image: uiImage) else {
          throw TextRecognitionError.InvalidPathException
        }

        ciImage = ciImageFromPath
      }

      let handler = VNImageRequestHandler(ciImage: ciImage, options: [:])

      try handler.perform([textRecognitionRequest])

      guard let results = textRecognitionRequest.results as? [VNRecognizedTextObservation] else {
        throw TextRecognitionError.TextRecognitionFailureException
      }

      var recognizedText: [String] = []

      for result in results {
        guard let bestCandidate = result.topCandidates(1).first else {
          continue
        }

        recognizedText.append(bestCandidate.string)
      }

      return recognizedText
    }
  }
}
