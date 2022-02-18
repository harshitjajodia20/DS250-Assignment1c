import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'abdominal bloating',
  'abdominal pain',
  'abnormal bleeding',
  'abnormal facial feature',
  'abnormal reflex',
  'abnormally frequent',
  'abnormally small head brain',
  'abscess',
  'acne',
  'acquiring drinking alcohol taking lot time',
  'affected part turning white',
  'anemia',
  'anxiety',
  'arm',
  'asthenopia',
  'asymptomatic early stage',
  'back',
  'bad breath',
  'bad smelling vaginal discharge',
  'barking cough',
  'better sitting worse lying',
  'birth baby younger week gestational age',
  'black area skin',
  'bleeding',
  'bleeding gum',
  'bleeding skin',
  'blindness',
  'blister break open form small ulcer',
  'bloating',
  'blood stool',
  'bloody diarrhea',
  'blue',
  'blurred vision',
  'blurred vision center visual field',
  'blurry vision',
  'bone tendon loss',
  'breathing problem',
  'breathlessness',
  'bruising',
  'burning',
  'burning sensation',
  'burning stabbing pain',
  'burning urination',
  'case asymptomatic',
  'certain thought repeatedly',
  'change bowel movement',
  'change breast shape',
  'change hair',
  'change reflex',
  'change skin color red black',
  'change sleeping eating pattern',
  'change taste',
  'change voice',
  'characteristic facial feature',
  'chest discomfort',
  'chest pain',
  'chest tightness',
  'chill',
  'chronic cough',
  'close object appear normal',
  'clumsiness',
  'cm lump skin',
  'cold sweat',
  'coma',
  'confused thinking',
  'confusion',
  'constipation',
  'coolness',
  'cough',
  'cough bloody mucus',
  'coughing',
  'coughing mucus',
  'cramped jaw',
  'crusty eyelid',
  'crusty red nodule',
  'cry episode',
  'dark urine',
  'darker',
  'daytime sleepiness',
  'decreased ability concentrate',
  'decreased ability feel pain',
  'decreased ability hear',
  'decreased ability see',
  'decreased ability think',
  'decreased ability think remember',
  'decreased appetite',
  'decreased motivation',
  'decreased range motion',
  'decreased taste',
  'decreased vision',
  'dehydration',
  'delayed physical growth',
  'delusion',
  'depends location runny nose',
  'depends organ involved',
  'deposit cholesterol eye lid',
  'depressed mood',
  'depression',
  'developmental disability',
  'diarrhea',
  'diarrhea constipation',
  'diarrhea mixed blood',
  'diarrhoea',
  'diarrhoea may bloody',
  'difficulty breathing',
  'difficulty cutting',
  'difficulty eating',
  'difficulty getting pregnant',
  'difficulty reading small print',
  'difficulty swallowing',
  'difficulty walking',
  'digestive issue',
  'dimpling skin',
  'discharge',
  'discharge penis',
  'disorientation',
  'distance near blur',
  'distant object appear blurry',
  'distorted blurred vision distance',
  'dizziness',
  'drinking large amount alcohol long period',
  'dry cough',
  'dry damp skin',
  'dry eye',
  'dry mouth',
  'dryness',
  'ear pain',
  'easy bleeding',
  'easy prolonged bleeding',
  'emotional problem',
  'enlarged spleen',
  'episode severe',
  'erythema',
  'erythema marginatum',
  'excess hair',
  'excessive amount uterine bleeding',
  'excessive daytime sleepiness',
  'excessive salivation',
  'extreme sadness',
  'eye pain',
  'eye pain photophobia',
  'eye redness',
  'eye refractive power differs significantly',
  'eye strain',
  'eyestrain',
  'facial swelling',
  'fast heart rate',
  'fatigue',
  'fear water',
  'feel need check thing repeatedly',
  'feeling cold',
  'feeling faint',
  'feeling faint upon standing',
  'feeling tired',
  'fever',
  'fever start low increase daily',
  'firm',
  'flat discolored spot bump may blister',
  'flatulence',
  'flu like illness',
  'fluid nipple',
  'frequent urination',
  'fullness',
  'gum disease',
  'half ring finger',
  'hallucination',
  'hallucination usually hearing voice',
  'hard swelling skin',
  'headache',
  'hearing loss',
  'heartburn',
  'heavy period',
  'high blood pressure',
  'high body temperature',
  'hoarse voice',
  'hold reading material farther away',
  'inability child',
  'inability move facial muscle one side',
  'inability move feel one side body',
  'increased breath rate',
  'increased fat',
  'increased heart rate',
  'increased hunger',
  'increased risk broken bone',
  'increased risk infection',
  'increased thirst',
  'index',
  'infertility',
  'inflamed eye',
  'intellectual disability',
  'internal bleeding',
  'involuntary muscle movement',
  'involuntary sleep episode',
  'irregular',
  'irregular menstrual period',
  'irritability',
  'irritation',
  'itchiness',
  'itchy',
  'itchy blister',
  'itchy bump',
  'jaw',
  'joint bone pain',
  'joint pain',
  'joint swelling',
  'large amount watery diarrhea',
  'lastly cause liver dysfunction eventually liver failure',
  'later stage',
  'light sensitivity',
  'lightheadedness',
  'limited range motion ankle',
  'little pain',
  'localized breast pain redness',
  'loose frequent bowel movement',
  'loose teeth',
  'loss appetite',
  'loss bladder bowel control',
  'loss hair part head body',
  'loss smell',
  'loss taste smell',
  'loss vision one side',
  'low energy',
  'lower abdominal pain',
  'lump',
  'lump breast',
  'lump bump neck',
  'maculopapular rash',
  'malaise',
  'may symptom',
  'memory loss',
  'memory problem',
  'mental change',
  'mid dilated pupil',
  'middle finger',
  'mild moderate intellectual disability',
  'minimal',
  'mood change',
  'mood swing',
  'multiple painful joint',
  'muscle ache',
  'muscle cramp',
  'muscle joint pain',
  'muscle pain',
  'muscle spasm',
  'muscle weakness beginning foot hand',
  'muscle weakness resulting inability move',
  'muscular pain',
  'nausea',
  'nausea vomiting weight loss dehydration occur',
  'near blur',
  'nearly undetectable spell',
  'nearsightedness',
  'neck',
  'neck pain',
  'neck stiffness',
  'neurological impairment',
  'newly inverted nipple',
  'night blindness',
  'non itchy skin ulcer',
  'non painful cyst middle eyelid',
  'nonaligned eye',
  'numbness',
  'object different size eye',
  'opening upper lip may extend nose palate',
  'overlying redness',
  'pain',
  'pain area',
  'pain around ear',
  'pain doesnt end shingle subsides',
  'pain specific bone',
  'painful',
  'painful blister white worm crawl',
  'painful heavy period',
  'painful sore inside mouth white gray red border',
  'painless',
  'painless lump',
  'painless mass',
  'pale color',
  'pale skin',
  'pallor',
  'paralysis',
  'paranoia',
  'parotitis non specific symptom fever',
  'patch thick',
  'patch white skin',
  'pelvic pain',
  'penile discharge',
  'perform certain routine repeatedly',
  'period vigorous shaking',
  'periumbilical right lower abdominal pain',
  'persistent dry cough',
  'persistent rough white red patch mouth lasting longer week',
  'physical disability',
  'pimple like rash',
  'pin needle sensation',
  'pinkish',
  'playing video game extremely long period time',
  'poor appetite',
  'possibly reaching high f c headache',
  'post nasal drip',
  'presence restricted interest repetitive behavior',
  'problem gambling',
  'problem language',
  'problem understanding speaking',
  'problem vision',
  'prolonged',
  'prolonged cough',
  'protein urine',
  'purple colored skin lesion',
  'raised',
  'raised red blue lesion',
  'rapid breathing',
  'rash',
  'recurring episode wheezing',
  'red',
  'red eye',
  'red purple darker skin',
  'red scaly patch skin breast',
  'red skin',
  'red spot white eye',
  'red without blister',
  'reddish eye',
  'redness',
  'redness eye',
  'redness sweating cheek area salivating',
  'rigidity',
  'round',
  'runny nose',
  'scaly patch skin',
  'scratchiness',
  'seizure',
  'sensitivity light',
  'sensitivity smell',
  'sensitivity sound',
  'shakiness',
  'sharp chest pain',
  'shock like pain one side face last second minute',
  'short stature',
  'shortness breath',
  'significant blood loss childbirth',
  'skin breakdown',
  'sleep problem',
  'slowness movement',
  'sluggishness',
  'small',
  'small blister surrounding swelling',
  'snoring',
  'social withdrawal',
  'sometimes none',
  'sore arm leg',
  'sore throat',
  'stiff neck',
  'stiffness',
  'stomach pain',
  'sudden',
  'sudden loss muscle strength',
  'sweating',
  'swell pain near tumor',
  'swelling',
  'swelling skin',
  'swollen',
  'swollen hand foot',
  'swollen lymph node',
  'swollen lymph node severe case',
  'swollen stomach enlarged liver spleen',
  'taste acid',
  'tearing',
  'temporary fleeting vision one eye',
  'tender breast',
  'tenderness',
  'testicular pain',
  'thick skin crack',
  'throat pain',
  'tingling burning sensation prior sore development',
  'tingling hand foot',
  'tingling thumb',
  'tiredness',
  'tooth loss',
  'tremor',
  'triangular tissue growth cornea',
  'trouble breathing nose',
  'trouble opening mouth',
  'trouble sleeping',
  'trouble social interaction',
  'trouble swallowing',
  'ulcer',
  'ulcer around genitals',
  'ulceration',
  'unexplained weight loss',
  'unpleasant smell present breath',
  'usage resulting problem',
  'usually ascending',
  'vaginal bleeding',
  'vaginal bleeding without pain',
  'vaginal discharge',
  'variable',
  'vary depending part brain involved',
  'velvety skin',
  'verbal nonverbal communication',
  'vision loss',
  'vomiting',
  'vomiting blood',
  'vomiting diarrhea muscle ache rash',
  'weakness',
  'weakness fatigue',
  'webbed neck',
  'weight loss',
  'wheezing',
  'widespread pain',
  'withdrawal occurring stopping',
  'worrying',
  'yellow skin',
  'yellowish coloration skin white eye',
  'yellowish skin',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip() {
  const theme = useTheme();
  const [symptomName, setSymptomName] = React.useState([]);
  const [diseases, setDiseases] = React.useState([]);
  const handleChange = (event) => {
    let value1 = event?.target?.value
    value1 = toString(value1)
    console.log(value1)
    const {
      target: { value },
    } = event;
    console.log(value)
    setSymptomName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("the value of event is :                ----------------------------------")
    console.log("the value of event is :                ----------------------------------")
    let symptoms = event.target[0].value
    console.log(symptoms,`${baseURL}/predict`);
    axios
      .post(`${baseURL}/predict`, {
        symptoms:symptoms
      })
      .then((response) => {
        console.log("donelllllllllllllllllllllllllllllllllll")
        console.log(response.data.prediction);
        setDiseases(response.data.prediction);
        console.log("these are the diseases",diseases)
      });
  };
//   React.useEffect(() => {
//     // action on update of movies
//     // return()
// }, [diseases]);
  console.log("hello")
  return (
    <div>
      <form onSubmit={(value) => handleSubmit(value)}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel> 
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          name = "multiselect"
          value={symptomName}
          onChange={(value) => handleChange(value)}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, symptomName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <input type="submit" value="Submit" />
      </form>
      {/* {diseases.map(({ name, probability }) => {
          <div>
            <strong>{name}</strong>
            <p>{probability}</p>
          </div>
      })} */}
    </div>
  );
}
