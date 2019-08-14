const express = require("express");
const router = express.Router();
const members = require("../../members");

//gets all members
router.get("/", (req, res) => res.json(members));

//get single member
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `no member with this id of ${req.params.id}` });
  }
});

//create member
router.post("/", (req, res) => {
  //res.send(req.body)
  const newMember = {
    id: 4,
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "please put your email and name" });
  }
  members.push(newMember);
  res.json(members);
  //res.redirect('/');
}),
  // update member
  router.put("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
      const updateMember = req.body;
      members.forEach(member => {
        if (member.id === parseInt(req.params.id)) {
          member.name = updateMember.name ? updateMember.name : member.name;
          member.email = updateMember.email ? updateMember.email : member.email;

          res.json({ msg: "updated member", member });
        }
      });
      res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
      res
        .status(400)
        .json({ msg: `no member with this id of ${req.params.id}` });
    }
  });

// delete member

router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "member deleted",
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `no member with this id of ${req.params.id}` });
  }
});

module.exports = router;
