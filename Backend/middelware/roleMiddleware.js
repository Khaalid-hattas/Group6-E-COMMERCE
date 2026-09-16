const VALID_ROLES = new Set(["customer", "creator"]);

export function roleMiddleware(requiredRole) {
  if (!VALID_ROLES.has(requiredRole)) {
    throw new Error("requiredRole must be 'customer' or 'creator'");
  }

  return function checkRole(req, res, next) {
    if (req.user?.role !== requiredRole) {
      return res.status(403).json({
        message: `Access restricted to ${requiredRole}s.`,
      });
    }

    next();
  };
}
