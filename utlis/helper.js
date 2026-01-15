export const formatAmount=(amount)=>{
    let num = Number(amount)   
    return new Intl.NumberFormat('en-IN',{
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
}

export function formatDateDMY(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return ""; // Invalid date check
  
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}


export const toCapitalize = (str) => {
    return str[0].toUpperCase() + str.substr(1).toLowerCase();
};

export const splitCamelCase =(str) => {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export function formatToK(amount) {
  if (amount >= 1000) {
      return (amount / 1000).toFixed(1) + 'k';
  }
  return amount.toString();
}


export function splitText(element, type = 'chars') {
  if (!element) return {};

  const text = element.textContent;
  element.textContent = '';

  let words = [];
  let chars = [];

  text.split(' ').forEach((word, i) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'word';
    wordSpan.style.display = 'inline-block';

    [...word].forEach((char) => {
      const charSpan = document.createElement('span');
      charSpan.className = 'char';
      charSpan.textContent = char;
      charSpan.style.display = 'inline-block';

      wordSpan.appendChild(charSpan);
      chars.push(charSpan);
    });

    if (i < text.split(' ').length - 1) {
      wordSpan.appendChild(document.createTextNode(' '));
    }

    element.appendChild(wordSpan);
    words.push(wordSpan);
  });

  return { words, chars };
}
