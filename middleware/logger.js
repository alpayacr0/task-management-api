const logger = (req, res, next) => {
  const start = Date.now();
  // şimdi aşağıda console.log ile konsola zaman, metod ve url bilgilerini
  // yazdırıyoruz.
  console.log(`${req.method} ${req.originalUrl} ${new Date().toISOString()}`);
  next();
};

module.exports = logger;
