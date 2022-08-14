import meal from './meal.socket';

export default function socketOnConnection(socket) {
  // console.log("user is connected ",socket.id)
  socket.on('changeMeal', meal.changeMeal);
  socket.on('changeUser', meal.changeUser);
  socket.on('changeExpense', meal.changeExpense);
}
