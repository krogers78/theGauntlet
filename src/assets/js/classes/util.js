class Utils {
  static randNum(min, max) {
    // ~~ is the same as Math.floor()
    return ~~(Math.random() * (max - min + 1) + min);
  }
}
