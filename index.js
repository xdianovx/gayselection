import { encrypt } from "eccrypto";

var rawPubKey =
  "04c694d889b2191892b52ab6c1a4671a1f58056e7b6e562ae5710248df2cf92892a4b5cffd569e0ccb2584da6fecbef27298a4f1bb847caa6272eeeb2931188a3d";

var pubkey = Buffer.from(rawPubKey, "hex");

encrypt(
  pubkey,
  Buffer(
    JSON.stringify({
      TransactionDetails: {
        Amount: 100,
        Currency: "RUB",
      },
      PaymentMethod: "Card",
      PaymentDetails: {
        CardholderName: "TEST CARD",
        CardNumber: "4111111111111111",
        CVC: "123",
        ExpMonth: "12",
        ExpYear: "24",
      },
      MessageExpiration: Date.now() + 86400000,
    })
  )
).then((encrypted) => {
  var sendData = {
    signedMessage: JSON.stringify({
      encryptedMessage: encrypted.ciphertext.toString("base64"),
      ephemeralPublicKey: encrypted.ephemPublicKey.toString("base64"),
    }),
    iv: encrypted.iv.toString("base64"),
    tag: encrypted.mac.toString("base64"),
  };

  var finalString = global.btoa(JSON.stringify(sendData));

  console.log(finalString);
});
