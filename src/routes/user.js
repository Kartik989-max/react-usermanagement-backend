import express from 'express';
import User from '../model/userModel.js';

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const exisiting = await User.findOne({email:req.body.email})
    if(!exisiting){
      const newUser =await new User(req.body);
      await newUser.save();
      res.status(201).json({ message: 'User added successfully' });
    }
    else{
      req.status(400).json({message:"Email is already exist"})
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const user = await User.find(req.body);
    res.send(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {

    // if user enter the email that alredy exists
   const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

export default router;
