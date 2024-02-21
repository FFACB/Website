import { scheduleJob } from 'node-schedule';
import { copyFileSync ,truncateSync} from 'fs';
import { logger } from '../logs/index.js';

export const saveLogs = (rule = "0 30 * * *") => {
   
    const job = scheduleJob(rule, function () {
        try {
            const today = new Date()
            const yesterday = new Date()
            yesterday.setDate(today.getDate() - 1);
            logger.info(`End of the day logs -> ${yesterday.getTime()}.log`)
            copyFileSync('logs/app.log', `logs/old/${yesterday.getTime()}.log`);
            truncateSync('logs/app.log', 0,)
            logger.info(`Logs saved !`)
            logger.info(`Begin of the day logs -> ${today.getTime()}.log`)
        
        } catch (err) {
            logger.error(err)
        }
    });

}