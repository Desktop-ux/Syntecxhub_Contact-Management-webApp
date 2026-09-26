const contactValidation = (req, res, next) => {
  const { name, email, phone } = req.body;
  const errors = [];

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!email || typeof email !== "string") {
    errors.push("Valid email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Invalid email format");
  }

  if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
    errors.push("Valid phone number is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

module.exports = contactValidation;