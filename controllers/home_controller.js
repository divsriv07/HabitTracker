const Habit = require('../models/habits');

// homepage controller
module.exports.home = async function(req, res) {
  try {
    const habits = await Habit.find({});
    return res.render('home', {
      title: "LoopBit",
      habit_list: habits
    });
  } catch (err) {
    console.log('Error in fetching the habits', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// controller to create a habit
module.exports.createHabit = async function(req, res) {
  try {
    let days = {
      one: "none",
      two: "none",
      three: "none",
      four: "none",
      five: "none",
      six: "none",
      seven: "none",
    };

    const newHabit = await Habit.create({
      habit: req.body.habit,
      end: req.body.end,
      description: req.body.description,
      frequency: req.body.frequency,
      date: Date(),
      time: req.body.time,
      days: days
    });

    console.log(newHabit);
    return res.redirect('back');
  } catch (err) {
    console.log('Error in creating habit', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// controller to delete a habit
module.exports.deleteHabit = async function(req, res) {
  try {
    let id = req.query.id;
    const deletedHabit = await Habit.findByIdAndDelete(id);
    if (!deletedHabit) {
      console.log('Error in deleting Habit');
      return res.status(404).json({ error: 'Habit not found' });
    }
    return res.redirect('back');
  } catch (err) {
    console.log('Error in deleting Habit', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
