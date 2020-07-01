export function mapTeamsById(base) {
  if (base && typeof base == "object") {
    return base.reduce((acumul, currentValue) => {
      acumul[currentValue._id] = currentValue;

      return acumul;
    }, {});
  } else {
    return {};
  }
}
