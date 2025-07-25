import Bug from "../models/Bug.js";

export const getBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.status(200).json(bugs);
  } catch (err) {
    next(err);
  }
};

export const createBug = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const newBug = await Bug.create({ title, description });
    res.status(201).json(newBug);
  } catch (err) {
    next(err);
  }
};

export const updateBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!bug) return res.status(404).json({ error: "Bug not found" });
    res.status(200).json(bug);
  } catch (err) {
    next(err);
  }
};

export const deleteBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) return res.status(404).json({ error: "Bug not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
