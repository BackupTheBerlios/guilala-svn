package net.transformatorhuis.guilala.polaroid;

import java.net.URL;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import org.apache.batik.swing.JSVGCanvas;

public class Stage extends JApplet {
	private static final long serialVersionUID = 1L;
	protected JPanel stg;
	protected JButton button = new JButton("svg 1");
	protected JButton button2 = new JButton("svg 2");
	protected JLabel label = new JLabel();
	protected JLabel label2 = new JLabel();
	public JSVGCanvas canvas = new JSVGCanvas();
	public JFrame f;
	public Svg  s1;
	
	public void init(){
		System.out.println("class: Stage applet v.01");
		
		stg = new JPanel(new BorderLayout());
		JPanel p = new JPanel(new FlowLayout(FlowLayout.LEFT));
        p.add(button);
        p.add(label);
        p.add(button2);
        p.add(label2);
        
        // Set the button action.
        button.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent ae){
            	loadSvg1("img/drawing1.svg");
            }
        });
        button2.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent ae){
            	loadSvg1("img/drawing2.svg");
            }
        });
        
        stg.add("North", p);
        stg.add("Center", canvas);
        stg.setVisible(true);
		
        add("Center", stg);

       
	}
	
	public void loadSvg1(String pic){
		// Display the document.
	    URL url = null;
	    try {
	    	url = new URL(getCodeBase(), pic);
	    } catch (java.net.MalformedURLException ex) {
	      System.out.println("Bad URL");
	      return;
	    }
		s1 = new Svg(url);
		canvas.setDocumentState(JSVGCanvas.ALWAYS_DYNAMIC);
		canvas.setDocument(s1.doc);
	}

	public void stop() {
		// Remove the document.
		canvas.setDocument(null);
	}

	public void destroy() {
		canvas.dispose();
	}

	public void browserResize(int bWidth, int bHeight){
		System.out.println("Browser resize-> " + bWidth + ", " + bHeight);
		Global.stageW = bWidth;
		Global.stageH = bHeight;

		stg.repaint(0, 0, bWidth, bHeight);
	}
}
