function sortByDate(tickets) {
  return tickets.sort((a, b) => {
    const dateA = a.from.date.split('/').reverse().join('-');
    const dateB = b.from.date.split('/').reverse().join('-');

    return new Date(dateA) - new Date(dateB);
  });


}

export default sortByDate;