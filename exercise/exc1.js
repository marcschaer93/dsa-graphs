class PersonNode {
  constructor(name, adjacent = new Set()) {
    this.name = name;
    this.adjacent = adjacent;
  }
}

class FriendGraph {
  constructor() {
    this.nodes = new Set();
  }
  addPerson(node) {
    this.nodes.add(node);
  }
  addPeople(peopleList) {
    for (let node of peopleList) {
      this.addPerson(node);
    }
  }
  setFriends(person1, person2) {
    person1.adjacent.add(person2);
    person2.adjacent.add(person1);
  }

  areConnected(person1, person2) {
    let toVisitQueue = [person1];
    let seen = new Set(toVisitQueue);
    while (toVisitQueue.length) {
      let currPerson = toVisitQueue.shift();
      console.log("VISITING", currPerson.name);

      if (currPerson === person2) return true;

      for (let neighbor of currPerson.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return false;
  }
}

const homer = new PersonNode("homer simpsons");
const marge = new PersonNode("marge simpsons");
const maggie = new PersonNode("maggie simpsons");
const lisa = new PersonNode("lisa simpsons");
const grandpa = new PersonNode("grandpa simpsons");

const friends = new FriendGraph();
friends.addPeople([homer, marge, maggie, lisa, grandpa]);
console.log("Friends:", friends);

friends.setFriends(homer, marge);
friends.setFriends(homer, maggie);
friends.setFriends(homer, lisa);
friends.setFriends(marge, maggie);
friends.setFriends(maggie, lisa);
friends.setFriends(lisa, grandpa);
