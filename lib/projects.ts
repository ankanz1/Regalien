export type ProjectImage = {
  id: string;
  src: string;
  alt: string;
  order: number;
};

export type InteriorProject = {
  id: string;
  name: string;
  coverImage: string | null;
  images: readonly ProjectImage[];
};

/** Explicit manifest of photographs found under public project folders. */
export const projects: readonly InteriorProject[] = [
  {
    id: "aa-iiib",
    name: 'AA-IIIB',
    coverImage: '/AA-IIIB/1.png',
    images: [
      {
        id: "aa-iiib-1",
        src: '/AA-IIIB/1.png',
        alt: 'Sculpted white entry door beside a marble floor and warm wood detailing',
        order: 1,
      },
      {
        id: "aa-iiib-2",
        src: '/AA-IIIB/2.png',
        alt: 'Interior photograph 2 from the AA-IIIB project',
        order: 2,
      },
      {
        id: "aa-iiib-3",
        src: '/AA-IIIB/3.png',
        alt: 'Interior photograph 3 from the AA-IIIB project',
        order: 3,
      },
      {
        id: "aa-iiib-4",
        src: '/AA-IIIB/4.png',
        alt: 'Interior photograph 4 from the AA-IIIB project',
        order: 4,
      },
      {
        id: "aa-iiib-5",
        src: '/AA-IIIB/5.png',
        alt: 'Interior photograph 5 from the AA-IIIB project',
        order: 5,
      },
      {
        id: "aa-iiib-6",
        src: '/AA-IIIB/6.png',
        alt: 'Interior photograph 6 from the AA-IIIB project',
        order: 6,
      },
      {
        id: "aa-iiib-7",
        src: '/AA-IIIB/7.png',
        alt: 'Interior photograph 7 from the AA-IIIB project',
        order: 7,
      },
      {
        id: "aa-iiib-8",
        src: '/AA-IIIB/8.png',
        alt: 'Interior photograph 8 from the AA-IIIB project',
        order: 8,
      },
      {
        id: "aa-iiib-9",
        src: '/AA-IIIB/9.png',
        alt: 'Interior photograph 9 from the AA-IIIB project',
        order: 9,
      },
      {
        id: "aa-iiib-10",
        src: '/AA-IIIB/10.png',
        alt: 'Interior photograph 10 from the AA-IIIB project',
        order: 10,
      },
      {
        id: "aa-iiib-11",
        src: '/AA-IIIB/11.png',
        alt: 'Interior photograph 11 from the AA-IIIB project',
        order: 11,
      },
      {
        id: "aa-iiib-12",
        src: '/AA-IIIB/12.png',
        alt: 'Interior photograph 12 from the AA-IIIB project',
        order: 12,
      },
      {
        id: "aa-iiib-13",
        src: '/AA-IIIB/13.png',
        alt: 'Interior photograph 13 from the AA-IIIB project',
        order: 13,
      },
      {
        id: "aa-iiib-14",
        src: '/AA-IIIB/14.png',
        alt: 'Interior photograph 14 from the AA-IIIB project',
        order: 14,
      },
      {
        id: "aa-iiib-15",
        src: '/AA-IIIB/15.png',
        alt: 'Interior photograph 15 from the AA-IIIB project',
        order: 15,
      },
      {
        id: "aa-iiib-16",
        src: '/AA-IIIB/16.jpg',
        alt: 'Interior photograph 16 from the AA-IIIB project',
        order: 16,
      },
      {
        id: "aa-iiib-17",
        src: '/AA-IIIB/17.png',
        alt: 'Interior photograph 17 from the AA-IIIB project',
        order: 17,
      },
      {
        id: "aa-iiib-18",
        src: '/AA-IIIB/19.png',
        alt: 'Interior photograph 18 from the AA-IIIB project',
        order: 18,
      },
      {
        id: "aa-iiib-19",
        src: '/AA-IIIB/20.jpg',
        alt: 'Interior photograph 19 from the AA-IIIB project',
        order: 19,
      },
      {
        id: "aa-iiib-20",
        src: '/AA-IIIB/21.jpg',
        alt: 'Interior photograph 20 from the AA-IIIB project',
        order: 20,
      },
    ],
  },
  {
    id: "anandi-residency",
    name: 'Anandi Residency',
    coverImage: '/Anandi%20Residency/3.jpg',
    images: [
      {
        id: "anandi-residency-1",
        src: '/Anandi%20Residency/1.jpg',
        alt: 'Interior photograph 1 from the Anandi Residency project',
        order: 1,
      },
      {
        id: "anandi-residency-2",
        src: '/Anandi%20Residency/2.jpg',
        alt: 'Interior photograph 2 from the Anandi Residency project',
        order: 2,
      },
      {
        id: "anandi-residency-3",
        src: '/Anandi%20Residency/3.jpg',
        alt: 'Illuminated wood cabinetry above a pale stone counter',
        order: 3,
      },
      {
        id: "anandi-residency-4",
        src: '/Anandi%20Residency/4.jpg',
        alt: 'Interior photograph 4 from the Anandi Residency project',
        order: 4,
      },
      {
        id: "anandi-residency-5",
        src: '/Anandi%20Residency/5.jpg',
        alt: 'Interior photograph 5 from the Anandi Residency project',
        order: 5,
      },
      {
        id: "anandi-residency-6",
        src: '/Anandi%20Residency/6.jpg',
        alt: 'Interior photograph 6 from the Anandi Residency project',
        order: 6,
      },
      {
        id: "anandi-residency-7",
        src: '/Anandi%20Residency/7.jpg',
        alt: 'Interior photograph 7 from the Anandi Residency project',
        order: 7,
      },
    ],
  },
  {
    id: "ca-218-newtown-aa-1",
    name: 'CA-218 ( NEWTOWN AA-1)',
    coverImage: '/CA-218%20(%20NEWTOWN%20AA-1)/1.jpg',
    images: [
      {
        id: "ca-218-newtown-aa-1-1",
        src: '/CA-218%20(%20NEWTOWN%20AA-1)/1.jpg',
        alt: 'Television wall with marble finish, warm lighting and display shelves',
        order: 1,
      },
      {
        id: "ca-218-newtown-aa-1-2",
        src: '/CA-218%20(%20NEWTOWN%20AA-1)/2.jpg',
        alt: 'Interior photograph 2 from the CA-218 ( NEWTOWN AA-1) project',
        order: 2,
      },
      {
        id: "ca-218-newtown-aa-1-3",
        src: '/CA-218%20(%20NEWTOWN%20AA-1)/3.jpg',
        alt: 'Interior photograph 3 from the CA-218 ( NEWTOWN AA-1) project',
        order: 3,
      },
      {
        id: "ca-218-newtown-aa-1-4",
        src: '/CA-218%20(%20NEWTOWN%20AA-1)/4.jpg',
        alt: 'Interior photograph 4 from the CA-218 ( NEWTOWN AA-1) project',
        order: 4,
      },
      {
        id: "ca-218-newtown-aa-1-5",
        src: '/CA-218%20(%20NEWTOWN%20AA-1)/5.jpg',
        alt: 'Interior photograph 5 from the CA-218 ( NEWTOWN AA-1) project',
        order: 5,
      },
    ],
  },
  {
    id: "garfa",
    name: 'Garfa',
    coverImage: '/Garfa/1.jpg',
    images: [
      {
        id: "garfa-1",
        src: '/Garfa/1.jpg',
        alt: 'Living area with a marble-effect feature wall and wood detailing',
        order: 1,
      },
      {
        id: "garfa-2",
        src: '/Garfa/2.jpg',
        alt: 'Interior photograph 2 from the Garfa project',
        order: 2,
      },
      {
        id: "garfa-3",
        src: '/Garfa/3.jpg',
        alt: 'Interior photograph 3 from the Garfa project',
        order: 3,
      },
      {
        id: "garfa-4",
        src: '/Garfa/4.jpg',
        alt: 'Interior photograph 4 from the Garfa project',
        order: 4,
      },
      {
        id: "garfa-5",
        src: '/Garfa/5.jpg',
        alt: 'Interior photograph 5 from the Garfa project',
        order: 5,
      },
      {
        id: "garfa-6",
        src: '/Garfa/6.jpg',
        alt: 'Interior photograph 6 from the Garfa project',
        order: 6,
      },
      {
        id: "garfa-7",
        src: '/Garfa/7.jpg',
        alt: 'Interior photograph 7 from the Garfa project',
        order: 7,
      },
      {
        id: "garfa-8",
        src: '/Garfa/8.jpg',
        alt: 'Interior photograph 8 from the Garfa project',
        order: 8,
      },
      {
        id: "garfa-9",
        src: '/Garfa/9.jpg',
        alt: 'Interior photograph 9 from the Garfa project',
        order: 9,
      },
      {
        id: "garfa-10",
        src: '/Garfa/10.jpg',
        alt: 'Interior photograph 10 from the Garfa project',
        order: 10,
      },
    ],
  },
  {
    id: "hiland-willows-aa-11",
    name: 'Hiland Willows (AA-11)',
    coverImage: '/Hiland%20Willows%20(AA-11)/1.jpg',
    images: [
      {
        id: "hiland-willows-aa-11-1",
        src: '/Hiland%20Willows%20(AA-11)/1.jpg',
        alt: 'Compact desk and storage built into a warm wood and white interior',
        order: 1,
      },
      {
        id: "hiland-willows-aa-11-2",
        src: '/Hiland%20Willows%20(AA-11)/2.jpg',
        alt: 'Interior photograph 2 from the Hiland Willows (AA-11) project',
        order: 2,
      },
      {
        id: "hiland-willows-aa-11-3",
        src: '/Hiland%20Willows%20(AA-11)/3.jpg',
        alt: 'Interior photograph 3 from the Hiland Willows (AA-11) project',
        order: 3,
      },
    ],
  },
  {
    id: "office",
    name: 'Office',
    coverImage: '/Office/1.jpg',
    images: [
      {
        id: "office-1",
        src: '/Office/1.jpg',
        alt: 'Regalien Interiors office reception and showroom',
        order: 1,
      },
      {
        id: "office-2",
        src: '/Office/2.jpg',
        alt: 'Interior photograph 2 from the Office project',
        order: 2,
      },
      {
        id: "office-3",
        src: '/Office/3.jpg',
        alt: 'Interior photograph 3 from the Office project',
        order: 3,
      },
      {
        id: "office-4",
        src: '/Office/4.jpg',
        alt: 'Interior photograph 4 from the Office project',
        order: 4,
      },
    ],
  },
  {
    id: "rishi-pranaya",
    name: 'Rishi Pranaya',
    coverImage: '/Rishi%20Pranaya/Living%20area/DSC08587.JPG',
    images: [
      {
        id: "rishi-pranaya-1",
        src: '/Rishi%20Pranaya/ceiling%20%26%20lights/DSC08588.JPG',
        alt: 'Interior photograph 1 from the Rishi Pranaya project',
        order: 1,
      },
      {
        id: "rishi-pranaya-2",
        src: '/Rishi%20Pranaya/ceiling%20%26%20lights/DSC08597.JPG',
        alt: 'Interior photograph 2 from the Rishi Pranaya project',
        order: 2,
      },
      {
        id: "rishi-pranaya-3",
        src: '/Rishi%20Pranaya/ceiling%20%26%20lights/DSC08600.JPG',
        alt: 'Interior photograph 3 from the Rishi Pranaya project',
        order: 3,
      },
      {
        id: "rishi-pranaya-4",
        src: '/Rishi%20Pranaya/ceiling%20%26%20lights/DSC08627.JPG',
        alt: 'Interior photograph 4 from the Rishi Pranaya project',
        order: 4,
      },
      {
        id: "rishi-pranaya-5",
        src: '/Rishi%20Pranaya/ceiling%20%26%20lights/DSC08630.JPG',
        alt: 'Interior photograph 5 from the Rishi Pranaya project',
        order: 5,
      },
      {
        id: "rishi-pranaya-6",
        src: '/Rishi%20Pranaya/Guest%20bedroom/Bed/DSC08648.JPG',
        alt: 'Interior photograph 6 from the Rishi Pranaya project',
        order: 6,
      },
      {
        id: "rishi-pranaya-7",
        src: '/Rishi%20Pranaya/Guest%20bedroom/Bed/DSC08652.JPG',
        alt: 'Interior photograph 7 from the Rishi Pranaya project',
        order: 7,
      },
      {
        id: "rishi-pranaya-8",
        src: '/Rishi%20Pranaya/Guest%20bedroom/Wardrobe/DSC08656.JPG',
        alt: 'Interior photograph 8 from the Rishi Pranaya project',
        order: 8,
      },
      {
        id: "rishi-pranaya-9",
        src: '/Rishi%20Pranaya/Guest%20bedroom/Wardrobe/DSC08658.JPG',
        alt: 'Interior photograph 9 from the Rishi Pranaya project',
        order: 9,
      },
      {
        id: "rishi-pranaya-10",
        src: '/Rishi%20Pranaya/Guest%20bedroom/Washroom/DSC08664.JPG',
        alt: 'Interior photograph 10 from the Rishi Pranaya project',
        order: 10,
      },
      {
        id: "rishi-pranaya-11",
        src: '/Rishi%20Pranaya/Guest%20bedroom/Washroom/DSC08666.JPG',
        alt: 'Interior photograph 11 from the Rishi Pranaya project',
        order: 11,
      },
      {
        id: "rishi-pranaya-12",
        src: '/Rishi%20Pranaya/Guest%20bedroom/Washroom/DSC08669.JPG',
        alt: 'Interior photograph 12 from the Rishi Pranaya project',
        order: 12,
      },
      {
        id: "rishi-pranaya-13",
        src: '/Rishi%20Pranaya/Guest%20bedroom/Washroom/DSC08675.JPG',
        alt: 'Interior photograph 13 from the Rishi Pranaya project',
        order: 13,
      },
      {
        id: "rishi-pranaya-14",
        src: '/Rishi%20Pranaya/Guest%20bedroom/Washroom/DSC08678.JPG',
        alt: 'Interior photograph 14 from the Rishi Pranaya project',
        order: 14,
      },
      {
        id: "rishi-pranaya-15",
        src: '/Rishi%20Pranaya/Kids%20bedroom/Bed/DSC08729.JPG',
        alt: 'Interior photograph 15 from the Rishi Pranaya project',
        order: 15,
      },
      {
        id: "rishi-pranaya-16",
        src: '/Rishi%20Pranaya/Kids%20bedroom/Bed/DSC08743.JPG',
        alt: 'Interior photograph 16 from the Rishi Pranaya project',
        order: 16,
      },
      {
        id: "rishi-pranaya-17",
        src: '/Rishi%20Pranaya/Kids%20bedroom/Bed/DSC08746.JPG',
        alt: 'Interior photograph 17 from the Rishi Pranaya project',
        order: 17,
      },
      {
        id: "rishi-pranaya-18",
        src: '/Rishi%20Pranaya/Kids%20bedroom/Wardrobe/DSC08734.JPG',
        alt: 'Interior photograph 18 from the Rishi Pranaya project',
        order: 18,
      },
      {
        id: "rishi-pranaya-19",
        src: '/Rishi%20Pranaya/Kids%20bedroom/Wardrobe/DSC08737.JPG',
        alt: 'Interior photograph 19 from the Rishi Pranaya project',
        order: 19,
      },
      {
        id: "rishi-pranaya-20",
        src: '/Rishi%20Pranaya/Kids%20bedroom/Wardrobe/DSC08741.JPG',
        alt: 'Interior photograph 20 from the Rishi Pranaya project',
        order: 20,
      },
      {
        id: "rishi-pranaya-21",
        src: '/Rishi%20Pranaya/Kids%20bedroom/Wardrobe/DSC08749.JPG',
        alt: 'Interior photograph 21 from the Rishi Pranaya project',
        order: 21,
      },
      {
        id: "rishi-pranaya-22",
        src: '/Rishi%20Pranaya/Kids%20bedroom/Wardrobe/DSC08754.JPG',
        alt: 'Interior photograph 22 from the Rishi Pranaya project',
        order: 22,
      },
      {
        id: "rishi-pranaya-23",
        src: '/Rishi%20Pranaya/Living%20area/DSC08587.JPG',
        alt: 'Living area with a dark feature wall, television unit and seating',
        order: 23,
      },
      {
        id: "rishi-pranaya-24",
        src: '/Rishi%20Pranaya/Living%20area/DSC08606.JPG',
        alt: 'Interior photograph 24 from the Rishi Pranaya project',
        order: 24,
      },
      {
        id: "rishi-pranaya-25",
        src: '/Rishi%20Pranaya/Living%20area/DSC08608.JPG',
        alt: 'Interior photograph 25 from the Rishi Pranaya project',
        order: 25,
      },
      {
        id: "rishi-pranaya-26",
        src: '/Rishi%20Pranaya/Living%20area/DSC08618.JPG',
        alt: 'Interior photograph 26 from the Rishi Pranaya project',
        order: 26,
      },
      {
        id: "rishi-pranaya-27",
        src: '/Rishi%20Pranaya/Living%20area/DSC08621.JPG',
        alt: 'Interior photograph 27 from the Rishi Pranaya project',
        order: 27,
      },
      {
        id: "rishi-pranaya-28",
        src: '/Rishi%20Pranaya/Living%20area/DSC08633.JPG',
        alt: 'Interior photograph 28 from the Rishi Pranaya project',
        order: 28,
      },
      {
        id: "rishi-pranaya-29",
        src: '/Rishi%20Pranaya/Living%20area/DSC08635.JPG',
        alt: 'Interior photograph 29 from the Rishi Pranaya project',
        order: 29,
      },
      {
        id: "rishi-pranaya-30",
        src: '/Rishi%20Pranaya/Living%20area/DSC08643.JPG',
        alt: 'Interior photograph 30 from the Rishi Pranaya project',
        order: 30,
      },
      {
        id: "rishi-pranaya-31",
        src: '/Rishi%20Pranaya/Master%20bedroom/Bed/DSC08694.JPG',
        alt: 'Interior photograph 31 from the Rishi Pranaya project',
        order: 31,
      },
      {
        id: "rishi-pranaya-32",
        src: '/Rishi%20Pranaya/Master%20bedroom/Bed/DSC08698.JPG',
        alt: 'Interior photograph 32 from the Rishi Pranaya project',
        order: 32,
      },
      {
        id: "rishi-pranaya-33",
        src: '/Rishi%20Pranaya/Master%20bedroom/Bed/DSC08700.JPG',
        alt: 'Interior photograph 33 from the Rishi Pranaya project',
        order: 33,
      },
      {
        id: "rishi-pranaya-34",
        src: '/Rishi%20Pranaya/Master%20bedroom/Bed/DSC08722.JPG',
        alt: 'Interior photograph 34 from the Rishi Pranaya project',
        order: 34,
      },
      {
        id: "rishi-pranaya-35",
        src: '/Rishi%20Pranaya/Master%20bedroom/Wardrobe/DSC08691.JPG',
        alt: 'Interior photograph 35 from the Rishi Pranaya project',
        order: 35,
      },
      {
        id: "rishi-pranaya-36",
        src: '/Rishi%20Pranaya/Master%20bedroom/Wardrobe/DSC08693.JPG',
        alt: 'Interior photograph 36 from the Rishi Pranaya project',
        order: 36,
      },
      {
        id: "rishi-pranaya-37",
        src: '/Rishi%20Pranaya/Master%20bedroom/Wardrobe/DSC08707.JPG',
        alt: 'Interior photograph 37 from the Rishi Pranaya project',
        order: 37,
      },
      {
        id: "rishi-pranaya-38",
        src: '/Rishi%20Pranaya/Master%20bedroom/Wardrobe/DSC08713.JPG',
        alt: 'Interior photograph 38 from the Rishi Pranaya project',
        order: 38,
      },
      {
        id: "rishi-pranaya-39",
        src: '/Rishi%20Pranaya/Master%20bedroom/Wardrobe/DSC08715.JPG',
        alt: 'Interior photograph 39 from the Rishi Pranaya project',
        order: 39,
      },
      {
        id: "rishi-pranaya-40",
        src: '/Rishi%20Pranaya/Master%20bedroom/Washroom/DSC08682.JPG',
        alt: 'Interior photograph 40 from the Rishi Pranaya project',
        order: 40,
      },
      {
        id: "rishi-pranaya-41",
        src: '/Rishi%20Pranaya/Master%20bedroom/Washroom/DSC08685.JPG',
        alt: 'Interior photograph 41 from the Rishi Pranaya project',
        order: 41,
      },
      {
        id: "rishi-pranaya-42",
        src: '/Rishi%20Pranaya/Master%20bedroom/Washroom/DSC08687.JPG',
        alt: 'Interior photograph 42 from the Rishi Pranaya project',
        order: 42,
      },
    ],
  },
  {
    id: "sunrise-point",
    name: 'Sunrise point',
    coverImage: '/Sunrise%20point/1.jpg',
    images: [
      {
        id: "sunrise-point-1",
        src: '/Sunrise%20point/1.jpg',
        alt: 'Living room with a warm illuminated television wall and seating',
        order: 1,
      },
      {
        id: "sunrise-point-2",
        src: '/Sunrise%20point/2.jpg',
        alt: 'Interior photograph 2 from the Sunrise point project',
        order: 2,
      },
      {
        id: "sunrise-point-3",
        src: '/Sunrise%20point/3.jpg',
        alt: 'Interior photograph 3 from the Sunrise point project',
        order: 3,
      },
      {
        id: "sunrise-point-4",
        src: '/Sunrise%20point/4.jpg',
        alt: 'Interior photograph 4 from the Sunrise point project',
        order: 4,
      },
      {
        id: "sunrise-point-5",
        src: '/Sunrise%20point/5.jpg',
        alt: 'Interior photograph 5 from the Sunrise point project',
        order: 5,
      },
      {
        id: "sunrise-point-6",
        src: '/Sunrise%20point/6.jpg',
        alt: 'Interior photograph 6 from the Sunrise point project',
        order: 6,
      },
      {
        id: "sunrise-point-7",
        src: '/Sunrise%20point/7.jpg',
        alt: 'Interior photograph 7 from the Sunrise point project',
        order: 7,
      },
      {
        id: "sunrise-point-8",
        src: '/Sunrise%20point/8.jpg',
        alt: 'Interior photograph 8 from the Sunrise point project',
        order: 8,
      },
      {
        id: "sunrise-point-9",
        src: '/Sunrise%20point/9.jpg',
        alt: 'Interior photograph 9 from the Sunrise point project',
        order: 9,
      },
      {
        id: "sunrise-point-10",
        src: '/Sunrise%20point/10.jpg',
        alt: 'Interior photograph 10 from the Sunrise point project',
        order: 10,
      },
      {
        id: "sunrise-point-11",
        src: '/Sunrise%20point/11.jpg',
        alt: 'Interior photograph 11 from the Sunrise point project',
        order: 11,
      },
    ],
  },
  {
    id: "tribhuvan",
    name: 'Tribhuvan',
    coverImage: null,
    images: [
    ],
  },
];

export const projectsWithPhotos = projects.filter(
  (project): project is InteriorProject & { coverImage: string } =>
    project.images.length > 0 && project.coverImage !== null,
);

export const homepageProjects = ["rishi-pranaya", "aa-iiib", "sunrise-point"].flatMap((id) => {
  const project = projectsWithPhotos.find((item) => item.id === id);
  return project ? [project] : [];
});
