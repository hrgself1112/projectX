
const express = require('express');
const router = express.Router();

const {HandleUserRegReq} = require("../controllers/register")



// router.route('/register')
// .

router.post('/', HandleUserRegReq);



router.get("/" , async (req, res)=>{
    try {
      const data = await DatabaseArticles.find({})
      res.json(data);
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data' });
    }
  })
  router.get("/:id" , async (req, res)=>{
    const itemId = req.params.id;
    try {
      const data = await DatabaseArticles.findById(itemId);
      res.render("index" , {data})
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data' });
    }
  })
  
// router.patch('/register', HandleUserRegReqWithPatch);

  
module.exports = router;
