export default function generateSKU() {
  const timeStamp = Date.now();

  const sku = `SNI-${timeStamp.toString().slice(-5)}`;
  console.log(sku);
}
