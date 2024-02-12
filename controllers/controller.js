const mysql = require('../configs/mysql');

exports.getCurrentWeekLeaderboard = (req, res) => {
    const sql = `SELECT * FROM gameRecords WHERE WEEK(timeStamp) = WEEK(NOW()) ORDER BY score DESC LIMIT 200`;
    mysql.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching leaderboard:', err);
            res.status(500).json({ error: 'Error fetching leaderboard' });
            return;
        }
        res.json(results);
    });
};

exports.getLastWeekLeaderboard = (req, res) => {
    const country = req.params.country;
    const sql = `SELECT * FROM gameRecords WHERE country = ? AND WEEK(timeStamp) = WEEK(NOW()) - 1 ORDER BY score DESC LIMIT 200`;
    mysql.query(sql, [country], (err, results) => {
        if (err) {
            console.error('Error fetching last week leaderboard:', err);
            res.status(500).json({ error: 'Error fetching last week leaderboard:' });
            return;
        }
        res.json(results);
    });
};

exports.getUserRank = (req, res) => {
    const userId = req.params.userId;
    const sql = `SELECT rank FROM (SELECT UID, @rownum := @rownum + 1 AS rank FROM gameRecords, (SELECT @rownum := 0) r ORDER BY Score DESC) AS ranks WHERE UID = ?`;
    mysql.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user rank:', err);
            res.status(500).json({ error: 'Error fetching user rank' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ userId: userId, rank: results[0].rank });
    });
};
