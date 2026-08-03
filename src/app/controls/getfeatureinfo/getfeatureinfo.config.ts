export type LayerFieldConfig = {
  field: string;
  label: string;
};

export type LayerMetaConfig = {
  source?: string;
  maillage?: string;
};

export type LayerConfig = {
  fields: LayerFieldConfig[];
  meta?: LayerMetaConfig;
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

export const SELECTED_FIELDS_BY_LAYER = new Map<string, LayerConfig>([
  ['IGNF_CARTO-SP_INDICATEUR-FRAGILITE-NUMERIQUE', {
    fields: [{ field: 'total', label: 'NOMBRE' }],
    meta: { source: '', maillage: 'Commune' },
  }],
  ['IGNF_CARTO-SP_QUARTIERS-PRIORITAIRES-VILLE', {
    fields: [{ field: 'nom_quartier', label: 'NOM' }],
    meta: { source: 'QPV 2024 - ANCT', maillage: 'Zonage' },
  }],
  ['IGNF_CARTO-SP_PPR_MEDECINS', {
    fields: [{ field: 'nb_generalistes', label: 'NOMBRE' }],
    meta: { source: 'Atlasanté 2025', maillage: 'Commune' },
  }],
  ['IGNF_CARTO-SP_PPR_INFIRMIERS', {
    fields: [{ field: 'nb_infirmiers_31122025', label: 'NOMBRE' }],
    meta: { source: 'Atlasanté 2025', maillage: 'Commune' },
  }],
  ['IGNF_CARTO-SP_PPR_KINESITHERAPEUTES', {
    fields: [{ field: 'nb_kines_31122025', label: 'NOMBRE' }],
    meta: { source: 'Atlasanté 2025', maillage: 'Commune' },
  }],
  ['IGNF_CARTO-SP_PPR_DENTISTES', {
    fields: [{ field: 'nb_dentistes_31122025', label: 'NOMBRE' }],
    meta: { source: 'Atlasanté 2025', maillage: 'Commune' },
  }],
  ['IGNF_CARTO-SP_PPR_ORTHOPHONISTES', {
    fields: [{ field: 'nb_orthophonistes_31122025', label: 'NOMBRE' }],
    meta: { source: 'Atlasanté 2025', maillage: 'Commune' },
  }],
  ['IGNF_CARTO-SP_PPR_SAGES_FEMMES', {
    fields: [{ field: 'nb_sages_femmes_31122025', label: 'NOMBRE' }],
    meta: { source: 'Atlasanté 2025', maillage: 'Commune' },
  }],
  ['IGNF_CARTO-SP_DENSITE-MEDECINS', {
    fields: [{ field: 'densite_medecins_2024', label: 'DENSITÉ' }],
    meta: { source: 'Observatoire des territoires - ANCT', maillage: 'Commune' },
  }],
  ['IGNF_CARTO-SP_MOYENNE-AGE-MEDECINS', {
    fields: [{ field: 'moyenne_age_medecins_2025', label: "MOYENNE D'ÂGE" }],
    meta: { source: 'Observatoire des territoires - ANCT', maillage: 'Commune' },
  }],
  ['IGNF_CARTO-SP_ACCESSIBILITE-SOINS-PREMIER-RECOURS', {
    fields: [{ field: 'typologie', label: '' }],
    meta: { source: 'Observatoire des territoires - ANCT', maillage: 'Commune' },
  }],
  ['IGNF_CARTO-SP_ZONAGE-CPTS', {
    fields: [
      { field: '_num_finess', label: 'NUMÉRO' },
      { field: '_nom', label: 'NOM' },
    ],
    meta: { source: 'Atlasanté - CPTS', maillage: 'Zonage' },
  }],
]);
