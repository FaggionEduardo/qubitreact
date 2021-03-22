import marked from "marked";
import parse from 'html-react-parser';
export default function Marked(children) {
      var rawMarkup = marked(children, {sanitize: true})
      return parse(rawMarkup)
}