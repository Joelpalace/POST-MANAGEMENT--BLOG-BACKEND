const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return res.status(401).json({ msg: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });
  next();
};
/* exports.isAuthor = (req, res, next) => {
  if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });
  next();
};
exports.isAuthorOrAdmin = (req, res, next) => {
  if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });
  next();
};
exports.isAuthorOrSelf = (req, res, next) => {
  if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });
  next();
};
exports.isAuthorOrAdminOrSelf = (req, res, next) => {
  if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });
  next();
};
exports.isAuthorOrAdminOrSelfOrModerator = (req, res, next) => {
  if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin' && req.user.role !== 'moderator') return res.status(403).json({ msg: 'Forbidden' });
  next();
};
exports.isAuthorOrAdminOrSelfOrModeratorOrGuest = (req, res, next) => {
  if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin' && req.user.role !== 'moderator' && req.user.role !== 'guest') return res.status(403).json({ msg: 'Forbidden' });
  next();
};
exports.isAuthorOrAdminOrSelfOrModeratorOrGuestOrMember = (req, res, next) => {
  if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin' && req.user.role !== 'moderator' && req.user.role !== 'guest' && req.user.role !== 'member') return res.status(403).json({ msg: 'Forbidden' });
  next();
};
exports.isAuthorOrAdminOrSelfOrModeratorOrGuestOrMemberOrSubscriber = (req, res, next) => {
  if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin' && req.user.role !== 'moderator' && req.user.role !== 'guest' && req.user.role !== 'member' && req.user.role !== 'subscriber') return res.status(403).json({ msg: 'Forbidden' });
  next();
};
exports.isAuthorOrAdminOrSelfOrModeratorOrGuestOrMemberOrSubscriberOrVIP = (req, res, next) => {
  if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin' && req.user.role !== 'moderator' && req.user.role !== 'guest' && req.user.role !== 'member' && req.user.role !== 'subscriber' && req.user.role !== 'VIP') return res.status(403).json({ msg: 'Forbidden' });
  next();
};
exports.isAuthorOrAdminOrSelfOrModeratorOrGuestOrMemberOrSubscriberOrVIPOrSuperAdmin = (req, res, next) => {
  if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin' && req.user.role !== 'moderator' && req.user.role !== 'guest' && req.user.role !== 'member' && req.user.role !== 'subscriber' && req.user.role !== 'VIP' && req.user.role !== 'superadmin') return res.status(403).json({ msg: 'Forbidden' });
  next();
};
exports.isAuthorOrAdminOrSelfOrModeratorOrGuestOrMemberOrSubscriberOrVIPOrSuperAdminOrOwner = (req, res, next) => {
  if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin' && req.user.role !== 'moderator' && req.user.role !== 'guest' && req.user.role !== 'member' && req.user.role !== 'subscriber' && req.user.role !== 'VIP' && req.user.role !== 'superadmin' && req.user.role !== 'owner') return res.status(403).json({ msg: 'Forbidden' });
  next();
}; */