const User = require('./User');
const Article = require('./Article');

User.hasMany(Article, {
    foreignKey: 'art_id',
    onDelete: 'CASCADE'
});

Article.belongsTo(User, {
    foreignKey: 'art_id'
});

module.exports = { User, Article };