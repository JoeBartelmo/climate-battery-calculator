/**
 * Conversions used to standardize calculations to ft
 */
export const enum UnitConversions {
    SQIN_TO_SQFT = 0.00694444,
    SQCM_TO_SQFT = 0.00107639,
    SQM_TO_SQFT  = 10.7639,
    CUIN_TO_CUFT = 0.000578704,
    CUCM_TO_CUFT = 3.53147e-5,
    CUM_TO_CUFT  = 35.3147
}

/**
 * A Map of user friendly inputs and their conversion amount correlation;
 * @implNotes This and {@link UnitConversions} are separated to make the 
 *  calculation a little clearer
 */
export const UnitConversionMap = {
    'ft²': 1,
    'ft³': 1,
    'in²': UnitConversions.SQIN_TO_SQFT,
    'in³': UnitConversions.CUIN_TO_CUFT,
    'cm²': UnitConversions.SQCM_TO_SQFT,
    'cm³': UnitConversions.CUCM_TO_CUFT,
    'm²' : UnitConversions.SQM_TO_SQFT,
    'm³' : UnitConversions.CUM_TO_CUFT
}