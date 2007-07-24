package net.transformatorhuis.guilala.polaroid;

import java.net.URL;
import org.apache.batik.dom.svg.SAXSVGDocumentFactory;
import org.apache.batik.swing.JSVGCanvas;
import org.apache.batik.util.XMLResourceDescriptor;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

public class Svg extends Stage{
	private static final long serialVersionUID = 1L;
	protected JSVGCanvas canvas;
	protected Document doc;
	protected Element svg;
	
	public Svg(URL url){
		System.out.println("class: DrawSvg: load svg file: " + url);
		try {
			// Parse the barChart.svg file into a Document.
			String parser = XMLResourceDescriptor.getXMLParserClassName();
			SAXSVGDocumentFactory f = new SAXSVGDocumentFactory(parser);
			
			doc = f.createDocument(url.toString());
			svg = doc.getDocumentElement();
			
			// Change the document viewBox.
			// svg.setAttributeNS(null, "viewBox", "40 95 370 265");
			// Make the text look nice.
			svg.setAttributeNS(null, "text-rendering", "geometricPrecision");
		} catch (Exception ex) { System.out.println("class: DrawSvg: Batik exception: " + ex); }
	}
}
