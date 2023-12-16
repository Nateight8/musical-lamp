import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { acceptedFiles } from "./filesProps";

const s3 = new S3Client({
  region: "us-east-1",

  credentials: {
    accessKeyId: "AKIA4MRLXQ6DC2OG266I",
    secretAccessKey: "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",
  },
});

export async function getSignedURL(type: string, id: string) {
  if (!acceptedFiles.includes(type)) {
    return;
  }

  const putObject = new PutObjectCommand({
    Bucket: "musical-lamb-local",
    Key: id,
    ContentType: type,
  });

  const url = await getSignedUrl(s3, putObject, { expiresIn: 120 });
  return {
    success: { url },
  };
}
