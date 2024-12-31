import { H } from "@highlight-run/node";

export const highlightMiddleware = (req, res, next) => {
  H.consumeEvent("api_request", {
    method: req.method,
    path: req.path,
    query: req.query,
    // Be careful not to log sensitive data
    headers: {
      "content-type": req.headers["content-type"],
      "user-agent": req.headers["user-agent"],
    },
  });
  next();
};
