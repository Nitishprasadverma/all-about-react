import { Router } from 'express';
import { allPayments, buySubscription, cancleSubscription, getRazorpayApiKey, verifySubsCription } from '../controllers/payment.controllers.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';



const router = Router();

router
    .route('/razorpay-key')
    .get(
        isLoggedIn,
        getRazorpayApiKey
    )


router
    .route('/verify')
    .post(
        isLoggedIn,
        verifySubsCription
    )

router
    .route('/subscribe')
    .post(
        isLoggedIn,
        buySubscription
    )

router
    .route('/unsubscribe')
    .post(
        isLoggedIn,
        cancleSubscription
    )

router
    .route('/')
    .get(
        isLoggedIn,
        allPayments
    )

export default router;