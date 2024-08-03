const Transaction = require("../Models/TransactionModel");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const Decimal = require('decimal.js');


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "zihan.zig2@gmail.com",
      pass: "zgdbjobygnmyqhgy",
    },
  });

  // Schedule a daily job to check for due dates and send notifications
cron.schedule('0 0 * * *', async () => {
  // Calculate today's date
  const today = new Date();

  // Find transactions with due dates for today or one day away
  const transactions = await Transaction.find({
    $or: [
      { dueDate: today },
      { dueDate: { $gte: today, $lte: new Date(today.getTime() + 24 * 60 * 60 * 1000) } },
    ],
  });

  // Iterate over the matching transactions and send notifications
for (const transaction of transactions) {
  const { buyer } = transaction; // Retrieve the buyer's ID from the transaction

  // Fetch the buyer's details (e.g., email, amount, product name) based on the buyer's ID
  const buyerDetails = await User.findById(buyer);

  if (buyerDetails) {
    const { email, amount, productName } = buyerDetails;

    // Send notifications and include email, amount, and product name
    sendNotificationEmail(transaction, email, amount, productName);
  }
}

  // Send notifications for each matching transaction
  // transactions.forEach(sendNotificationEmail);
});


module.exports.sampleDailyRun = async (req, res) => {
  const today = new Date();
  console.log("today is today")

  // Find transactions with due dates for today or one day away
  // const transactions = await Transaction.find({
  //   $or: [
  //     { dueDate: today },
  //     { dueDate: { $gte: today, $lte: new Date(today.getTime() + 24 * 60 * 60 * 1000) } },
  //   ],
  // });
  const transactions = await Transaction.find({
    $and: [
      { dueDate: today },
      { type: "selling" },
    ],
  });

  // Iterate over the matching transactions and send notifications
for (const transaction of transactions) {
  const { buyer } = transaction; // Retrieve the buyer's ID from the transaction

  // Fetch the buyer's details (e.g., email, amount, product name) based on the buyer's ID
  const buyerDetails = await Transaction.findById(buyer);

  if (buyerDetails) {
    const { email, amount, productName, buyerName } = buyerDetails;

    // Send notifications and include email, amount, and product name
    // sendNotificationEmail(transaction, email, amount, productName);

    // Compose the email
    const mailOptions = { //
      from: "zihan.zig2@gmail.com",
      to: email,
      subject: "Reminding the Payment Due date",
      html: `<p>Hi ${buyerName},</p><p>Today is your last day to pay the bill for ABCD shop.</p>
      <p>Please pay as soon as possible.</p></hr><p>Your amount is ${amount}</p><p>Purchased product is ${productName}</p>
      </hr> <p>Thank you.</p>`,
      
    };  

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if(error){
        console.error(error);
        res.status(500).json({ message: "Failed to send notification email" });
      } else {
        console.log("Bill notification email sent successfully");
      res.json({ message: "Bill notification has been sent to your email" });
      }
    });

  }
}
};

module.exports.DailyRun = async (req, res) => {
  try {
    const today = new Date();
    console.log("today is today"+today);
    const todayDateISTDateOnly = today.toISOString().split('T')[0]; // e.g., "2023-10-15"
    console.log(todayDateISTDateOnly)


    const transactions = await Transaction.find({
      $and: [
        {
          dueDate: {
            $lte: new Date(todayDateISTDateOnly + "T23:59:59.999Z") // End of the current IST day in UTC
          }
        },
        { type: "selling" },
      ],
    });
    console.log(transactions)

    // Use Promise.all to send emails in parallel
    const emailPromises = transactions.map(async (transaction) => {
      const { buyerId } = transaction;
      console.log(buyerId)

      const buyerDetails = await Transaction.findOne({ buyerId: buyerId });
      console.log(buyerDetails)

      if (buyerDetails) {
        const { email, amount, product, buyerName } = buyerDetails;

        const mailOptions = {
          from: "zihan.zig2@gmail.com",
          to: email,
          subject: "Reminding the Payment Due date",
          html: `<p>Hi ${buyerName},</p><p>Your payment for the purchase of ${product} is due today.</p>
          <p>Please pay as soon as possible.</p><hr /><p>Your amount is ${amount}</p>
          <hr /> <p>Thank you.</p>`,
        };

        return new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              reject(error);
            } else {
              console.log("Bill notification email sent successfully");
              resolve();
            }
          });
        });
      }
    });

    // Wait for all email promises to complete
    await Promise.all(emailPromises);

    res.json({ message: "Daily check the dueDate is checked." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send notification emails" });
  }
};

module.exports.DailyRun2 = async (req, res) => {
  try {
    const today = new Date();
    console.log("today is today"+today);
    const todayDateISTDateOnly = today.toISOString().split('T')[0]; // e.g., "2023-10-15"
    console.log(todayDateISTDateOnly);

    const tomorrowDate = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const tomorrowDateISTDateOnly = tomorrowDate.toISOString().split('T')[0];
    console.log(tomorrowDateISTDateOnly)


    const transactions = await Transaction.find({
      $and: [
        {
          dueDate: {
            $lte: new Date(tomorrowDateISTDateOnly + "T23:59:59.999Z") // End of the current IST day in UTC
          }
        },
        { type: "selling" },
      ],
    });
    console.log(transactions)

    // Use Promise.all to send emails in parallel
    const emailPromises = transactions.map(async (transaction) => {
      const { buyerId } = transaction;
      console.log(buyerId)

      const buyerDetails = await Transaction.findOne({ buyerId: buyerId });
      console.log(buyerDetails)

      if (buyerDetails) {
        const { email, amount, product, buyerName } = buyerDetails;

        const mailOptions = {
          from: "zihan.zig2@gmail.com",
          to: email,
          subject: "Reminding the Payment Due date",
          html: `<p>Hi ${buyerName},</p><p>Your payment for the purchase of ${product} is due tomorrow.</p>
          <p>Please pay as soon as possible.</p><hr /><p>Your amount is ${amount}</p>
          <hr /> <p>Thank you.</p>`,
        };

        return new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              reject(error);
            } else {
              console.log("Bill notification email sent successfully");
              resolve();
            }
          });
        });
      }
    });

    // Wait for all email promises to complete
    await Promise.all(emailPromises);

    res.json({ message: "Daily check the dueDate is checked." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send notification emails" });
  }
};

// save pending transactions for temporary
module.exports.PendingTransaction = async (req, res) => {
  try {
    const { product, amount, type, dueDate, paymentStatus, buyerId, createdAt } = req.body;

    const getUser = await User.findById(buyerId);
    const email = getUser.email;
    const buyerName = getUser.name;

    const pendingTransaction = await PendingTransaction.create({
      email,
      product,
      amount,
      type,
      dueDate,
      paymentStatus,
      buyerId,
      buyerName,
      createdAt,
    });

    // Send push notification or email here if needed

    res.status(201).json({ success: true, data: pendingTransaction });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.PendingTransactionAction = async (req, res) => {
  try {
    const { transactionId, action } = req.params;

    const pendingTransaction = await PendingTransaction.findById(transactionId);
    const email = pendingTransaction.email;
    const type = pendingTransaction.type;
    const product = pendingTransaction.product;
    const amount = pendingTransaction.amount;
    const dueDate = pendingTransaction.dueDate;
    const paymentStatus = pendingTransaction.paymentStatus;
    const buyerId = pendingTransaction.buyerId;
    const buyerName = pendingTransaction.buyerName;
    const createdAt = pendingTransaction.createdAt;
    const isApproved = true;

    if (!pendingTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (action === 'approve') {
      // Approve and save the transaction
      // pendingTransaction.isApproved = true;
      // await pendingTransaction.save();
      // console.log(pendingTransaction.product)
      // console.log(pendingTransaction.buyerName)
      // console.log(pendingTransaction.email)
      const selling = await Transaction.create({ email, type, product, amount, dueDate, paymentStatus, buyerId, buyerName, createdAt, isApproved });
      
      // implement a auditlog collection

      res.status(200).json({ message: 'Transaction approved and saved to database.', data: pendingTransaction });
    } else if (action === 'decline') {
      // Decline and delete the transaction
      await PendingTransaction.findByIdAndDelete(transactionId); // implement a auditlog collection

      res.status(200).json({ message: 'Transaction declined and deleted' });
    } else {
      res.status(400).json({ message: 'Invalid action' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports.SellingTransaction = async (req, res) => {
    try {

        // const { email, product, amount, dueDate, paymentStatus, buyerId, buyerName, createdAt } = req.body;
        console.log(req.body)
        const { product, amount, type, dueDate, paymentStatus, buyerId, createdAt } = req.body;

        const getUser = await User.findById(buyerId);
        // const type = "selling";
        // console.log('called')
        // console.log(req.body)
        // console.log(req.body.inputValue)
        // console.log(getUser)
        // console.log(getUser.email)
        // console.log(getUser.username)
        const email = getUser.email;
        const buyerName = getUser.username;

        const selling = await Transaction.create({ email, type, product, amount, dueDate, paymentStatus, buyerId, buyerName, createdAt });

        const currentDateAndTime = new Date();
        

        const shours = currentDateAndTime.getHours();
        const sminutes = currentDateAndTime.getMinutes();
        const ampm = shours >= 12 ? 'PM' : 'AM';
        const sTime = shours % 12 || 12;

        const soldTime = `${sTime}:${String(sminutes).padStart(2, '0')} ${ampm}`;
        const soldDate = `${currentDateAndTime.getFullYear()}-${currentDateAndTime.getMonth() + 1}-${currentDateAndTime.getDate()}`;

        const getDueDate = new Date(dueDate);
        const paymentDueDate = getDueDate.toISOString().split('T')[0];


        // Compose the email
    const mailOptions = { //
        from: "zihan.zig2@gmail.com",
        to: email,
        subject: "Bill of your debt purchase",
        html: `<p>Hi ${buyerName},</p><p>This is sample notification of your purchase bill.</p>
              <hr /><p>Purchase Date : ${soldDate}</p><p>Time : ${soldTime}</p> <p>Product : ${product}</p>
              <p>Amount : ${amount}</p><p>Payment Status : ${paymentStatus}</p><p>Payment Due date : ${paymentDueDate}</p>
              <hr /><h4>Please make sure to pay on or before ${paymentDueDate}.</h4><p>Thank You.</p>`,
        
      };  
  
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if(error){
          console.error(error);
          res.status(500).json({ message: "Failed to send notification email" });
        } else {
          console.log("Bill notification email sent successfully");
        res.json({ message: "Bill notification has been sent to your email" });
        }
      });

        res.status(201).json({ success: true, data: selling });

    }catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports.BuyingTransaction = async (req, res) => {
    try {

        const { email, product, amount, dueDate, paymentStatus, sellerId, sellerName, createdAt } = req.body;
        const type = "buying";

        const selling = await Transaction.create({ email, type, product, amount, dueDate, paymentStatus, sellerId, sellerName, createdAt });

        const currentDateAndTime = new Date();

        const shours = currentDateAndTime.getHours();
        const sminutes = currentDateAndTime.getMinutes();
        const ampm = shours >= 12 ? 'PM' : 'AM';
        const sTime = shours % 12 || 12;

        const purchasedTime = `${sTime}:${String(sminutes).padStart(2, '0')} ${ampm}`;
        const purchasedDate = `${currentDateAndTime.getFullYear()}-${currentDateAndTime.getMonth() + 1}-${currentDateAndTime.getDate()}`;

        const getDueDate = new Date(dueDate);
        const paymentDueDate = getDueDate.toISOString().split('T')[0];


        // Compose the email
    const mailOptions = { //
        from: "zihan.zig2@gmail.com",
        to: email,
        subject: "Bill of your debt purchase",
        html: `<p>Hi, You purchased from ${sellerName}.</p><p>This is sample notification of your purchase bill.</p>
              <hr /><p>Purchase Date : ${purchasedDate}</p><p>Time : ${purchasedTime}</p> <p>Product : ${product}</p>
              <p>Amount : ${amount}</p><p>Payment Status : ${paymentStatus}</p><p>Payment Due date : ${paymentDueDate}</p>
              <hr /><h4>Please make sure to pay on or before ${paymentDueDate}.</h4><p>Thank You.</p>`,
        
      };  
  
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if(error){
          console.error(error);
          res.status(500).json({ message: "Failed to send notification email" });
        } else {
          console.log("Bill notification email sent successfully");
        res.json({ message: "Bill notification has been sent to your email" });
        }
      });

        res.status(201).json({ success: true, data: selling });

    }catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


// Get Pending Transaction by user ID
module.exports.getPendingTransactionByUserID = async (req, res) => {
  try {
    const { userId } = req.params;
    // const userId = "66632820d515f655192a95d9";

    const pending = await PendingTransaction.findOne({buyerId: userId});
    // console.log("pending")
    console.log(pending)

    res.status(200).json({pending}); //passing response as user
  } catch (error){
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
}

module.exports.getTotalDebtByUserID = async (req, res) => {
  try {
    const {userId} = req.params;
    const debtTransactions = await Transaction.find({buyerId: userId}).sort({createdAt: -1});

    // Calculate total debt
    const totalDebt = debtTransactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

    console.log('Total Debt:', totalDebt);

    // You can also send this totalDebt in the response if needed
    res.status(200).json({ totalDebt });

    // console.log(debtTransactions);
  } catch (error){
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
}