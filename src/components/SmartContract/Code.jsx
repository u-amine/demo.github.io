import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import  {Controlled as CodeMirror} from 'react-codemirror2';
import styled from 'styled-components';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/nord.css';
import 'codemirror/mode/javascript/javascript';

import { errorServer, loadingMessage } from '../../constants/content.json';

const CodeStyled = styled.div`
  margin-top: ${props => props.theme.marginTop};
  heigth: 300px;
`;

const Code = (props) => {
  let code = 'loading';
  const { data, loading } = useQuery(props.query);
  if (loading) {
    code = loadingMessage;
  }
  if (data) {
     code = data.smartContract;
  };
  return (
    <CodeStyled>
      <CodeMirror
          value={code || errorServer}
          options={
            {
              lineNumbers: false,
              mode:  'javascript',
              theme: 'nord'
            }
          }
        >
        </CodeMirror>
    </CodeStyled>
  )
}

export default Code;
