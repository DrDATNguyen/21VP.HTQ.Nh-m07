exports.postLogin = async (req, res) => {
  try {
    //if (req.body.username === "admin" && req.body.password === "admin123") {} // render admin page
    const admin = await Admin.findOne({ adminname: req.body.adminname });
    if(!admin){
      req.flash('message', 'Cannot find your account');
      req.flash('title', 'Cannot find your account, create one');
      req.flash('href', '/admin/login'); 
      res.render('error', {
          message: req.flash('message'),
          title: req.flash('title'),
          href: req.flash('href')
      });
    }
    if (admin && admin.password === req.body.password) {
      
      req.session.admin = admin;
      console.log('Admin logged in:', req.session.admin);
      res.redirect('/admin/home');
    } else {
      req.flash('message', 'You have entered the wrong password');
      req.flash('title', 'Wrong Password');
      req.flash('href', '/admin/login'); 
      res.render('error', {
          message: req.flash('message'),
          title: req.flash('title'),
          href: req.flash('href')
      });
    }
  } catch (error) {
    console.log(error);
    req.flash('message', 'Something went wrong');
    req.flash('title', 'An error occurred while processing your request');
    req.flash('href', '/admin/login'); 
    res.render('error', {
        message: req.flash('message'),
        title: req.flash('title'),
        href: req.flash('href')
    });
  }
}
exports.getSignup = (req, res) => {
  res.render('signup');
}