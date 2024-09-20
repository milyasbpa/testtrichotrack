export const REGEX = {
  // source: https://www.regextester.com/93648
  name: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
  trailing_slash: /\s+$/,
  zero_in_the_beginning: /^0/,
  number_only: /^[0-9]*$/,
  // source: https://regexr.com/3e48o
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  // source: https://www.regexlib.com/REDetails.aspx?regexp_id=26210
  australia_phone_number:
    /^(((([\+]61[1-9]{0,1}|([\(]{0,1}0[\)]{0,1}[1-9]{1}|[\(]{0,1}0[1-9]{1}[\)]{0,1})))([0-9]{8}|([\\s*]|[\-]{1})[0-9]{3}([\\s*]|[\-]{1})[0-9]{3}([\\s*]|[\-]{1})[0-9]{3}|(([\\s*]|[\-]{0,1})[0-9]{4}([\\s*]|[\-]{0,1})[0-9]{4})))|((1([\\s*]|[\-]{0,1})((300|800|900|902)|3[0-9]{2}))([\\s*]|[\-]{0,1})([0-9]{3}([\\s*]|[\-]{0,1})[0-9]{3}|[0-9]{6}))|((13[0-9]{1}([\\s*]|[\-]){0,1}[0-9]{3}|13([\\s*]|[\-]){1}[0-9]{2}([\\s*]|[\-]){1}[0-9]{2})))$/,
  // source: https://www.regextester.com/104145
  singapore_phone_number: /[6|8|9]\d{6}|\+65[6|8|9]\d{6}|\+65\s[6|8|9]\d{6}/,
  // source: https://www.regextester.com/113246
  indonesia_phone_number: /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/,
  // source: https://regexpattern.com/phone-number/#in
  india_phone_number:
    /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
  // source: https://regexpattern.com/phone-number/#cn
  china_phone_number:
    /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
  //   source: https://stackoverflow.com/questions/45406613/regex-pattern-for-malaysian-mobile-phone-number
  malaysia_phone_number: /^(\+?6?01)[0-46-9]-*[0-9]{7,8}$/,
  // source:https://www.regextester.com/98583
  united_states_phone_number:
    /^(^\+1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/,
};
