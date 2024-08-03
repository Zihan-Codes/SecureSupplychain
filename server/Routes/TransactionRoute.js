const express = require('express');
const router = express.Router();

const { 
    SellingTransaction, 
    BuyingTransaction, 
    sampleDailyRun, 
    DailyRun, 
    DailyRun2, 
    PendingTransaction, 
    PendingTransactionAction,
    getPendingTransactionByUserID,
    getTotalDebtByUserID
} = require("../Controllers/TransactionController");



router.post('/selling', SellingTransaction);
router.post('/buying', BuyingTransaction);
router.get('/run', sampleDailyRun);
router.get('/rund', DailyRun);
router.get('/rund2', DailyRun2);
router.post('/pending', PendingTransaction);
router.post('/transaction/respond/:transactionId/:action', PendingTransactionAction);
router.get('/pending/:userId', getPendingTransactionByUserID);
router.get('/getdtotal/:userId', getTotalDebtByUserID);

module.exports = router;