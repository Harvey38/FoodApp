const Plan = require('./../models/plan');
const stripe = require('stripe')('sk_test_M4UgwwScEttaEOmk4WOvXG1300INiHZE1d');
module.exports.getCheckout = async (req,res)=>
{
    const id = req.params.planId;
    const plan = await Plan.findById(id);
    console.log(plan);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                name: `${plan.name}`,
                description: `${plan.description}`,
                amount: `${plan.price}`,
                currency: 'usd',
                quantity: 1,
            }],
            success_url: 'http://localhost:3000/home',
            cancel_url: 'http://localhost:3000/me',
        });

        res.status(201).json({status:"Payment for "+plan.name+" made",session});
};