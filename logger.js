const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            timestamp: true,
            maxsize: 10000000
        }),
        new winston.transports.File({
            filename: 'combined.log',
            timestamp: true,
            maxsize: 10000000
        }),
    ]
});

module.exports = logger;