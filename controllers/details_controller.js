const Habit = require('../models/habits');
const { json } = require('express');

// controller for get details request
module.exports.details = async function(req, res) {
  try {
    const habits = await Habit.find({});
    return res.render('details', {
      title: "LoopBit Weekly",
      habit_list: habits
    });
  } catch (err) {
    console.log('Error in fetching the habits', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Updating the database for the request
module.exports.updateHabit = async function(req, res) {
  try {
    const id = req.query.id;
    const habit = await Habit.findById(id);
    if (!habit) {
      console.log('Habit not found');
      return res.status(404).json({ error: 'Habit not found' });
    }

    const newHabit = { ...habit.toObject() };
    const day = req.query.day;
    const val = req.query.val;

    for (let prop in newHabit.days) {
      if (prop === day) {
        if (val === 'none') {
          newHabit.days[day] = 'yes';
          newHabit.streak++;
        } else if (val === 'yes') {
          newHabit.days[day] = 'no';
          newHabit.streak--;
        } else {
          newHabit.days[day] = 'none';
        }
      }
    }

    const updatedHabit = await Habit.findByIdAndUpdate(id, newHabit);
    if (!updatedHabit) {
      console.log('Error in updating habit');
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.redirect('back');
  } catch (err) {
    console.log('Error in updating habit', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
