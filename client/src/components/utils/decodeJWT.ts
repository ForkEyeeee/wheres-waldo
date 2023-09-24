const decodeJWT = () => {
  const usertoken: any = req.headers.authorization;
  const token = usertoken.split(" ");
  const decoded = jwt.verify(token[1], process.env.signature);
};
