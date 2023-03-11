import Refractor from 'react-refractor';
import js from 'refractor/lang/javascript';
import powershell from 'refractor/lang/powershell';
import json from 'refractor/lang/json';

Refractor.registerLanguage(js);
Refractor.registerLanguage(powershell);
Refractor.registerLanguage(json);

const CodeBlock = ({
  value,
  language,
  markers,
  filename,
}: {
  value: string;
  language: string;
  markers: (number | Refractor.Marker)[] | undefined;
  filename: string;
}) => {
  return (
    <div className="code-block">
      <Refractor
        value={value}
        language={language === 'sh' ? 'powershell' : language}
        markers={markers}
      />
      {filename && <span className="caption">{filename}</span>}
    </div>
  );
};

export default CodeBlock;
