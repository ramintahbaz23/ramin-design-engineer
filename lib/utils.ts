/**
 * Check if two elements are within proximity threshold
 * @param keyRect - Bounding rectangle of the key element
 * @param lockRect - Bounding rectangle of the lock element
 * @param threshold - Distance threshold in pixels (default: 5px)
 * @returns true if elements are within threshold distance
 */
export function checkProximity(
  keyRect: DOMRect,
  lockRect: DOMRect,
  threshold: number = 5
): boolean {
  // Calculate center points
  const keyCenterX = keyRect.left + keyRect.width / 2;
  const keyCenterY = keyRect.top + keyRect.height / 2;
  const lockCenterX = lockRect.left + lockRect.width / 2;
  const lockCenterY = lockRect.top + lockRect.height / 2;

  // Calculate distance between centers
  const distance = Math.sqrt(
    Math.pow(keyCenterX - lockCenterX, 2) + Math.pow(keyCenterY - lockCenterY, 2)
  );

  return distance <= threshold;
}


