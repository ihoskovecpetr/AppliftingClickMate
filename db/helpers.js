module.exports = {
  compareTotalClicks: (a, b) => {
    if (a.totalClicks > b.totalClicks) {
      return -1;
    }
    if (a.totalClicks < b.totalClicks) {
      return 1;
    }
    return 0;
  },
};
