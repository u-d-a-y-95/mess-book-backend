import meal from "./meal.socket";
export const socketUsers = {};
export default function socketOnConnection(socket) {
  socketUsers[socket.handshake.query.id] = socket.id;
  console.log(socketUsers);
  socket.on("changeMeal", meal.changeMeal);
  socket.on("changeUser", meal.changeUser);
  socket.on("changeExpense", meal.changeExpense);
}
