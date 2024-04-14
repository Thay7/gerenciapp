import React, { useState } from 'react';
import { Button, View, Text, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as xmlJs from 'xml-js'; 

export const EntradaEstoqueXml = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [xmlData, setXmlData] = useState(null);

  const pickDocument = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync();
      //console.log('Document:', document);
      if (document != null && document.assets[0].uri) {
        setSelectedDocument(document);

        const fileContent = await fetch(document.assets[0].uri);
        const xmlContent = await fileContent.text();
        const jsonData = xmlJs.xml2json(xmlContent, { compact: true, spaces: 4 });
        setXmlData(JSON.parse(jsonData));
      } else {
        setSelectedDocument(null);
        setXmlData(null);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pick a Document" onPress={pickDocument} />
      {selectedDocument && (
        <Text>
          Selected Document: {selectedDocument.assets[0].name} ({selectedDocument.assets[0].mimeType})
        </Text>
      )}
      {xmlData && (
        <ScrollView>
          <Text>Parsed XML Data:</Text>
          <Text>{JSON.stringify(xmlData, null, 2)}</Text>
        </ScrollView>
      )}
    </View>
  );
}
