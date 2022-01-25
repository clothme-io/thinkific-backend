import jwt from "jsonwebtoken";

var privateKey = "shgrgrhbdge4546hhbrbrhgrgrg";

export const sign_jwt_token = (id: number, shortId: string, email: string) => {
  var token = jwt.sign({ id, shortId, email }, privateKey, {
    expiresIn: 86400,
  });
  return token;
};

export const decode_jwt_token = (tokenInput: string) => {
  var decodedToken = jwt.decode(tokenInput, { complete: true });
  return decodedToken;
};
