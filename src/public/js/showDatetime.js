const getDatetime= (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const day = date.toLocaleDateString("vi-VN", options);
    const time = date.toLocaleTimeString("vi-VN");
    return `${time} ${"|"} ${day}`;
  };

  const updateDateTime = () => {
    const now = new Date();
    document.getElementById('datetime').textContent = getDatetime(now);
  };

  setInterval(updateDateTime, 1000);