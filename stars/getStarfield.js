// ============================================================================
// FILE: getStarfield.js
// ============================================================================
// Generates a randomized spherical starfield for Three.js scenes.
// Stars are distributed uniformly across a sphere using polar coordinates.
// ============================================================================

import * as THREE from "three";

// ============================================================================
// FUNCTION: getStarfield()
// ============================================================================
// Creates and returns a THREE.Points object representing a starfield.
// Parameters:
//   - numStars: total number of stars to generate
//   - radius:   overall radius of the star distribution
// ============================================================================
export default function getStarfield({ numStars = 10, radius = 25 } = {}) {

    // ------------------------------------------------------------------------
    // GEOMETRY: STAR POSITIONS
    // ------------------------------------------------------------------------
    // Each star is placed randomly on a spherical shell.
    // Polar coordinates (theta, phi) are converted to Cartesian (x, y, z).
    // ------------------------------------------------------------------------
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(numStars * 3);

    for (let i = 0; i < numStars; i++) {
        const theta = Math.random() * 2 * Math.PI;             // azimuthal angle
        const phi = Math.acos(2 * Math.random() - 1);          // polar angle
        const distance = radius * (0.8 + 0.2 * Math.random()); // slight depth variance

        const x = distance * Math.sin(phi) * Math.cos(theta);
        const y = distance * Math.sin(phi) * Math.sin(theta);
        const z = distance * Math.cos(phi);

        starPositions[i * 3]     = x;
        starPositions[i * 3 + 1] = y;
        starPositions[i * 3 + 2] = z;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));

    // ------------------------------------------------------------------------
    // MATERIAL: STAR VISUAL PROPERTIES
    // ------------------------------------------------------------------------
    // Small white points that fade with distance for visual realism.
    // ------------------------------------------------------------------------
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.01,
        sizeAttenuation: true,
    });

    // ------------------------------------------------------------------------
    // RETURN: STARFIELD MESH
    // ------------------------------------------------------------------------
    // Returns a Points object for integration into the Three.js scene.
    // ------------------------------------------------------------------------
    return new THREE.Points(starGeometry, starMaterial);
}
