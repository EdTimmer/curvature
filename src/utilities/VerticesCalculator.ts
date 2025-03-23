export const getHexagonVertices = (radius: number) => {
  const vertices = Array(6).fill(0).map((_, i) => {
    const angle = (i * Math.PI / 3) - Math.PI / 2; // Start from bottom (270°)
    return [
      radius * Math.cos(angle),
      radius * Math.sin(angle),
      0
    ] as [number, number, number];
  });
  return vertices;
}

export const getEquilateralTriangleVertices = (radius: number) => {
  const vertices = Array(3).fill(0).map((_, i) => {
    const angle = (i * 2 * Math.PI / 3) - Math.PI / 2; // Start from bottom (270°)
    return [
      radius * Math.cos(angle),
      radius * Math.sin(angle),
      0
    ] as [number, number, number];
  });
  return vertices;
}