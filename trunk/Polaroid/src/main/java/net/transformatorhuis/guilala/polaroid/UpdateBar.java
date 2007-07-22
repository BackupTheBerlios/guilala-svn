package net.transformatorhuis.guilala.polaroid;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import org.apache.batik.swing.JSVGCanvas;

public class UpdateBar {

	public void updateBar(final String name, final float value,
			final JSVGCanvas canvas, final Document doc, final Element svg) {
		canvas.getUpdateManager().getUpdateRunnableQueue().invokeLater(
				new Runnable() {
					public void run() {
						Element bar = doc.getElementById(name);
						if (bar == null) {
							return;
						}

						Node n;
						Element path1, path2, path3;
						for (n = bar.getFirstChild(); n.getNodeType() != Node.ELEMENT_NODE; n = n
								.getNextSibling()) {
						}
						path1 = (Element) n;
						for (n = n.getNextSibling(); n.getNodeType() != Node.ELEMENT_NODE; n = n
								.getNextSibling()) {
						}
						path2 = (Element) n;
						for (n = n.getNextSibling(); n.getNodeType() != Node.ELEMENT_NODE; n = n
								.getNextSibling()) {
						}
						path3 = (Element) n;

						int offset;
						if (name.equals("ShoeBar")) {
							offset = 0;
						} else if (name.equals("CarBar")) {
							offset = 79;
						} else if (name.equals("TravelBar")) {
							offset = 158;
						} else {
							offset = 237;
						}

						String d = "M " + (offset + 86) + ",240 v -"
								+ (3.7 * value) + " l 15,-15 v "
								+ (3.7 * value) + " l -15,15 z";
						path1.setAttributeNS(null, "d", d);
						d = "M " + (offset + 86) + "," + (240 - 3.7 * value)
								+ " h -39 l 15,-15 h 39 l -15,15 z";
						path2.setAttributeNS(null, "d", d);
						d = "M " + (offset + 47) + "," + (240 - 3.7 * value)
								+ " v " + (3.7 * value) + " h 39 v -"
								+ (3.7 * value) + " h -39 z";
						path3.setAttributeNS(null, "d", d);
					}
				});
	}
}

