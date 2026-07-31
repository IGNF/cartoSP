export type LayerFieldConfig = {
  field: string;
  label: string;
};

export type LayerProperties = Record<string, unknown>;

export type LayerLike = {
  name?: string;
  getVisible: () => boolean;
  getSource?: () => unknown;
  getProperties?: () => LayerProperties;
};

export type VisibleWmsLayer<S> = {
  layer: LayerLike;
  source: S;
};

export const GFI_INFO_FORMAT = 'application/json';
export const GFI_FEATURE_COUNT = 10;
export const MARKER_WIDTH_PX = '72px';
export const MARKER_HEIGHT_PX = '78px';
export const MARKER_OFFSET: [number, number] = [0, 30];

export const INVALID_GFI_RESPONSE_MARKERS = [
  'ServiceExceptionReport',
  'java.lang.NullPointerException',
  'java.lang.OutOfMemoryError',
  'not queryable',
  'No data',
  'non interrogeable',
];

export const IGNORED_LAYERS: string[] = [
  'IGNF_CARTO-SP_BASSINS-VIE',
  'IGNF_CARTO-SP_DENSITE-POPULATION-CARREAU',
  'IGNF_CARTO-SP_PART-MOINS-18ANS',
  'IGNF_CARTO-SP_PART-PLUS-65ANS',
  'IGNF_CARTO-SP_PART-MENAGES-PAUVRES',
];

export const SELECTED_FIELDS_BY_LAYER = new Map<string, LayerFieldConfig[]>([
  ['IGNF_CARTO-SP_INDICATEUR-FRAGILITE-NUMERIQUE', [{ field: 'total', label: 'TOTAL' }]],
  ['IGNF_CARTO-SP_QUARTIERS-PRIORITAIRES-VILLE', [{ field: 'nom_quartier', label: 'NOM' }]],
  ['IGNF_CARTO-SP_PPR_MEDECINS', [{ field: 'nb_generalistes', label: 'NOMBRE' }]],
  ['IGNF_CARTO-SP_PPR_INFIRMIERS', [{ field: 'nb_infirmiers_31122025', label: 'NOMBRE' }]],
  ['IGNF_CARTO-SP_PPR_KINESITHERAPEUTES', [{ field: 'nb_kines_31122025', label: 'NOMBRE' }]],
  ['IGNF_CARTO-SP_PPR_DENTISTES', [{ field: 'nb_dentistes_31122025', label: 'NOMBRE' }]],
  ['IGNF_CARTO-SP_PPR_ORTHOPHONISTES', [{ field: 'nb_orthophonistes_31122025', label: 'NOMBRE' }]],
  ['IGNF_CARTO-SP_PPR_SAGES_FEMMES', [{ field: 'nb_sages_femmes_31122025', label: 'NOMBRE' }]],
  ['IGNF_CARTO-SP_DENSITE-MEDECINS', [{ field: 'densite_medecins_2024', label: 'DENSITÉ' }]],
  ['IGNF_CARTO-SP_MOYENNE-AGE-MEDECINS', [{ field: 'moyenne_age_medecins_2025', label: "MOYENNE D'ÂGE" }]],
  ['IGNF_CARTO-SP_ACCESSIBILITE-SOINS-PREMIER-RECOURS', [{ field: 'typologie', label: 'TYPOLOGIE' }]],
  ['IGNF_CARTO-SP_ZONAGE-CPTS', [
    { field: '_num_finess', label: 'NUMÉRO' },
    { field: '_nom', label: 'NOM' },
  ]],
]);
