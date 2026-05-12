import { v2 as cloudinary } from "cloudinary"

// Configure une seule fois au démarrage
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export interface UploadResult {
  url:      string
  publicId: string
}

export class CloudinaryService {

  /** Upload un buffer (image ou PDF) */
async upload(
  buffer: Buffer,
  options: { folder: string; resourceType?: "image" | "raw" }
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        resource_type: options.resourceType ?? "image",
        timeout: 60000,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error)
          return reject(error)
        }

        if (!result) {
          return reject(new Error("Upload échoué"))
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        })
      }
    ).end(buffer)
  })
}
/** Supprimer un fichier par son publicId */
  async delete(publicId: string, resourceType: "image" | "raw" = "image") {
    return cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
  }
}