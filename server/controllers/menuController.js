// @desc    Tambah menu
// @route   POST /admin/menu/add
// @access  Private, Admin-only
const addMenu = (req, res, next) => {};

// @desc    Get semua menu
// @route   GET /menu
// @access  Public
const getMenu = (req, res, next) => {};

// @desc    Remove menu
// @route   DELETE /admin/menu/:id/delete
// @access  Private, Admin-only
const removeMenu = (req, res, next) => {};

// @desc    Edit menu
// @route   UPDATE /admin/menu/:id/edit
// @access  Private, Admin-only
const editMenu = (req, res, next) => {};

// @desc    Set status menu
// @route   UPDATE /admin/menu/:id/set_status
// @access  Private, Admin-only
const setStatusMenu = (req, res, next) => {};

module.exports = { addMenu };
